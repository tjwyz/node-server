import { shallowMount } from '@vue/test-utils';
import Banner from '../banner.vue';

/* global describe, it, expect */
describe('Banner.vue', () => {
    it('show copyright', () => {
        const wrapper = shallowMount(Banner);
        expect(wrapper.find('h1').text()).toMatch('life');
    });
});
