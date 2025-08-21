import type { HTMLAttributes, ImgHTMLAttributes, Ref, ReservedProps } from 'vue';
import type { ElementScriptTrigger } from '../types.js';
interface PlaceholderOptions {
    width?: string | number;
    height?: string | number;
    center?: string;
    zoom?: number;
    size?: string;
    scale?: number;
    format?: 'png' | 'jpg' | 'gif' | 'png8' | 'png32' | 'jpg-baseline';
    maptype?: 'roadmap' | 'satellite' | 'terrain' | 'hybrid';
    language?: string;
    region?: string;
    markers?: string;
    path?: string;
    visible?: string;
    style?: string;
    map_id?: string;
    key?: string;
    signature?: string;
}
type __VLS_Props = {
    /**
     * Defines the trigger event to load the script.
     */
    trigger?: ElementScriptTrigger;
    /**
     * Is Google Maps being rendered above the fold?
     * This will load the placeholder image with higher priority.
     */
    aboveTheFold?: boolean;
    /**
     * Defines the Google Maps API key. Must have access to the Static Maps API as well.
     */
    apiKey?: string;
    /**
     * A latitude / longitude of where to focus the map.
     */
    center?: google.maps.LatLng | google.maps.LatLngLiteral | `${string},${string}`;
    /**
     * Should a marker be displayed on the map where the centre is.
     */
    centerMarker?: boolean;
    /**
     * Options for the map.
     */
    mapOptions?: google.maps.MapOptions;
    /**
     * Defines the region of the map.
     */
    region?: string;
    /**
     * Defines the language of the map
     */
    language?: string;
    /**
     * Defines the version of google maps js API
     */
    version?: string;
    /**
     * Defines the width of the map.
     */
    width?: number | string;
    /**
     * Defines the height of the map
     */
    height?: number | string;
    /**
     * Customize the placeholder image attributes.
     *
     * @see https://developers.google.com/maps/documentation/maps-static/start.
     */
    placeholderOptions?: PlaceholderOptions;
    /**
     * Customize the placeholder image attributes.
     */
    placeholderAttrs?: ImgHTMLAttributes & ReservedProps & Record<string, unknown>;
    /**
     * Customize the root element attributes.
     */
    rootAttrs?: HTMLAttributes & ReservedProps & Record<string, unknown>;
    /**
     * Extra Markers to add to the map.
     */
    markers?: (`${string},${string}` | google.maps.marker.AdvancedMarkerElementOptions)[];
};
declare function createAdvancedMapMarker(_options?: google.maps.marker.AdvancedMarkerElementOptions | `${string},${string}`): Promise<google.maps.marker.AdvancedMarkerElement | undefined>;
declare function resolveQueryToLatLang(query: string): Promise<google.maps.LatLng | undefined>;
declare function importLibrary(key: 'marker'): Promise<google.maps.MarkerLibrary>;
declare function importLibrary(key: 'places'): Promise<google.maps.PlacesLibrary>;
declare function importLibrary(key: 'geometry'): Promise<google.maps.GeometryLibrary>;
declare function importLibrary(key: 'drawing'): Promise<google.maps.DrawingLibrary>;
declare function importLibrary(key: 'visualization'): Promise<google.maps.VisualizationLibrary>;
declare function importLibrary(key: string): Promise<any>;
declare var __VLS_1: {
    placeholder: any;
}, __VLS_3: {}, __VLS_9: {}, __VLS_11: {}, __VLS_13: {};
type __VLS_Slots = {} & {
    placeholder?: (props: typeof __VLS_1) => any;
} & {
    loading?: (props: typeof __VLS_3) => any;
} & {
    awaitingLoad?: (props: typeof __VLS_9) => any;
} & {
    error?: (props: typeof __VLS_11) => any;
} & {
    default?: (props: typeof __VLS_13) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    googleMaps: Ref<typeof google.maps | undefined, typeof google.maps | undefined>;
    map: Ref<google.maps.Map | undefined, google.maps.Map | undefined>;
    createAdvancedMapMarker: typeof createAdvancedMapMarker;
    resolveQueryToLatLang: typeof resolveQueryToLatLang;
    importLibrary: typeof importLibrary;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: () => any;
    ready: (e: {
        readonly googleMaps: Ref<typeof google.maps | undefined, typeof google.maps | undefined>;
        readonly map: Ref<google.maps.Map | undefined, google.maps.Map | undefined>;
        readonly createAdvancedMapMarker: typeof createAdvancedMapMarker;
        readonly resolveQueryToLatLang: typeof resolveQueryToLatLang;
        readonly importLibrary: typeof importLibrary;
    }) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onError?: (() => any) | undefined;
    onReady?: ((e: {
        readonly googleMaps: Ref<typeof google.maps | undefined, typeof google.maps | undefined>;
        readonly map: Ref<google.maps.Map | undefined, google.maps.Map | undefined>;
        readonly createAdvancedMapMarker: typeof createAdvancedMapMarker;
        readonly resolveQueryToLatLang: typeof resolveQueryToLatLang;
        readonly importLibrary: typeof importLibrary;
    }) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
