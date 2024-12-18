import Vue from 'vue';
import Banner from './banner.vue';
import './index.css';
import './less.less';
import './scss.scss';
import './stylus.styl';

new Vue({
    el: '#app',
    components: {
        Banner,
    },
    template: '<Banner/>',
});
