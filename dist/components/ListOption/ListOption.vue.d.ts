import Vue from 'vue';
declare type Type = 'bullet' | 'number';
/**
 * <br/>
 * <h4 class="desc">
 * Lists display a set of related text-only content.
 * Each list item begins with a bullet or a number.
 * </h4>
 */
export default class List extends Vue {
    /**
     * Type of list to display
     * @values bullet | number
     */
    type: Type;
    element: string;
    protected get className(): string;
}
export {};
