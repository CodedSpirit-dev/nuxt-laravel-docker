function propsToJsonSchema(props) {
  const schema = {
    type: "object",
    properties: {},
    required: []
  };
  for (const prop of props) {
    const propSchema = {};
    if (prop.description) {
      propSchema.description = prop.description;
    }
    const propType = convertVueTypeToJsonSchema(prop.type, prop.schema);
    Object.assign(propSchema, propType);
    if (prop.default !== void 0 && propSchema.default === void 0) {
      propSchema.default = parseDefaultValue(prop.default);
    }
    schema.properties[prop.name] = propSchema;
    if (prop.required) {
      schema.required.push(prop.name);
    }
  }
  if (schema.required.length === 0) {
    delete schema.required;
  }
  return schema;
}
function convertVueTypeToJsonSchema(vueType, vueSchema) {
  const { type: unwrappedType, schema: unwrappedSchema, enumValues } = unwrapEnumSchema(vueType, vueSchema);
  if (enumValues && unwrappedType === "boolean") {
    return { type: "boolean", enum: enumValues };
  }
  if (unwrappedType.endsWith("[]")) {
    const itemType = unwrappedType.replace(/\[\]$/, "").trim();
    if (unwrappedSchema && typeof unwrappedSchema === "object" && unwrappedSchema.kind === "array" && Array.isArray(unwrappedSchema.schema) && unwrappedSchema.schema.length > 0) {
      const itemSchema = unwrappedSchema.schema[0];
      return {
        type: "array",
        items: convertVueTypeToJsonSchema(itemSchema.type || itemType, itemSchema)
      };
    }
    if (unwrappedSchema && typeof unwrappedSchema === "object" && "schema" in unwrappedSchema && unwrappedSchema["schema"] && typeof unwrappedSchema["schema"] === "object" && !Array.isArray(unwrappedSchema["schema"]) && Object.keys(unwrappedSchema["schema"]).length === 1 && Object.keys(unwrappedSchema["schema"])[0] === "0") {
      const itemSchema = unwrappedSchema["schema"]["0"];
      if (typeof itemSchema === "string") {
        return {
          type: "array",
          items: convertSimpleType(itemSchema)
        };
      }
      if (itemSchema && typeof itemSchema === "object" && itemSchema.kind === "enum" && Array.isArray(itemSchema["schema"])) {
        return {
          type: "array",
          items: {
            type: itemSchema["schema"].map((t) => typeof t === "string" ? t : t.type)
          }
        };
      }
      return {
        type: "array",
        items: convertVueTypeToJsonSchema(itemType, itemSchema)
      };
    }
    return {
      type: "array",
      items: convertSimpleType(itemType)
    };
  }
  if (unwrappedType.toLowerCase() === "object" || unwrappedType.match(/^{.*}$/) || unwrappedSchema && typeof unwrappedSchema === "object" && unwrappedSchema.kind === "object") {
    let nested = void 0;
    const vs = unwrappedSchema;
    if (vs && typeof vs === "object" && !Array.isArray(vs) && Object.prototype.hasOwnProperty.call(vs, "schema") && vs["schema"] && typeof vs["schema"] === "object") {
      nested = vs["schema"];
    } else if (vs && typeof vs === "object" && !Array.isArray(vs)) {
      nested = vs;
    }
    if (nested) {
      const properties = convertNestedSchemaToJsonSchemaProperties(nested);
      const required = Object.entries(nested).filter(([_, v]) => v && typeof v === "object" && v.required).map(([k]) => k);
      const schemaObj = {
        type: "object",
        properties,
        additionalProperties: false
      };
      if (required.length > 0) {
        schemaObj.required = required;
      }
      return schemaObj;
    }
    return { type: "object" };
  }
  return convertSimpleType(unwrappedType);
}
function convertNestedSchemaToJsonSchemaProperties(nestedSchema) {
  const properties = {};
  for (const key in nestedSchema) {
    const prop = nestedSchema[key];
    let type = "any", schema = void 0, description = "", def = void 0;
    if (prop && typeof prop === "object") {
      type = prop.type || "any";
      schema = prop.schema || void 0;
      description = prop.description || "";
      def = prop.default;
    } else if (typeof prop === "string") {
      type = prop;
    }
    properties[key] = convertVueTypeToJsonSchema(type, schema);
    if (description) {
      properties[key].description = description;
    }
    if (def !== void 0) {
      if (type === "object" && typeof def === "object" && !Array.isArray(def) && Object.keys(def).length === 0 || !(type === "string" && def === "") && !(type === "number" && def === 0) && !(type === "boolean" && def === false) && !(type === "array" && Array.isArray(def) && def.length === 0)) {
        properties[key].default = def;
      }
    }
  }
  return properties;
}
function convertSimpleType(type) {
  switch (type.toLowerCase()) {
    case "string":
      return { type: "string" };
    case "number":
      return { type: "number" };
    case "boolean":
      return { type: "boolean" };
    case "object":
      return { type: "object" };
    case "array":
      return { type: "array" };
    case "null":
      return { type: "null" };
    default:
      if (type.includes("{}") || type.includes("Object")) {
        return { type: "object" };
      }
      return {};
  }
}
function parseDefaultValue(defaultValue) {
  try {
    if (defaultValue.startsWith('"') && defaultValue.endsWith('"')) {
      return defaultValue.slice(1, -1);
    }
    if (defaultValue === "true") return true;
    if (defaultValue === "false") return false;
    if (/^-?\d+(\.\d+)?$/.test(defaultValue)) {
      return parseFloat(defaultValue);
    }
    if (defaultValue.startsWith("{") || defaultValue.startsWith("[")) {
      return JSON.parse(defaultValue);
    }
    return defaultValue;
  } catch {
    return defaultValue;
  }
}
function unwrapEnumSchema(vueType, vueSchema) {
  if (typeof vueSchema === "object" && vueSchema?.kind === "enum" && vueSchema?.schema && typeof vueSchema?.schema === "object") {
    const values = Object.values(vueSchema.schema).filter((v) => v !== "undefined");
    if (values.every((v) => v === "true" || v === "false")) {
      if (values.length === 2) {
        return { type: "boolean", schema: void 0 };
      } else if (values.length === 1) {
        return { type: "boolean", schema: void 0, enumValues: [values[0] === "true"] };
      }
    }
    if (values.length === 1) {
      const s = values[0];
      let t = vueType;
      if (typeof s === "object" && s.type) t = s.type;
      else if (typeof s === "string") t = s;
      return { type: t, schema: s };
    }
    for (const s of values) {
      if (s !== "undefined") {
        let t = vueType;
        if (typeof s === "object" && s.type) t = s.type;
        else if (typeof s === "string") t = s;
        return { type: t, schema: s };
      }
    }
  }
  return { type: vueType, schema: vueSchema };
}

export { propsToJsonSchema };
