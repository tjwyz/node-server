<template>
    <div>
        <div class="banner">
            <div class="logo"></div>
            <h1>life</h1>
        </div>
        <div class="article">
            <h2>CSS</h2>
            <p>You can use lots of css format</p>
            <ul>
                <li>cssnext(stage: 3)</li>
                <li>less</li>
                <li>sass/scss</li>
                <li>stylus</li>
            </ul>
        </div>
    </div>
</template>
<style>
/* cssnext syntax, stage 3, https://preset-env.cssdb.org/features */
:root {
    --logo-size: 80px;
}

@keyframes rotate {
    from {
        transform: rotateZ(0);
    }
    to {
        transform: rotateZ(360deg);
    }
}

.banner {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
}
.logo {
    /* https://preset-env.cssdb.org/features#custom-properties */
    width: var(--logo-size);
    height: var(--logo-size);
    background: url('../../assets/img/logo.png') center center no-repeat;
    background-size: contain;
    animation: rotate infinite linear 3s;
}
.article {
    font-size: 14px;
}
h1 {
    font-size: 36px;
    margin-start: 30px;
    /* https://preset-env.cssdb.org/features#rebeccapurple-color */
    color: rebeccapurple;
}
</style>
<script>
export default {
    name: 'banner',
};
</script>
