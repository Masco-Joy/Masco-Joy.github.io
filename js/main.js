const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [], // ��ʼ��Ϊ������
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
        });
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render(); // ȷ�� render ������ mounted ���������е���
    },
    methods: {
        render() {
            if (this.renderers.length) {
                for (let i of this.renderers) {
                    if (typeof i === 'function') {
                        i();
                    }
                }
            }
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else {
                this.hiddenMenu = false;
            }
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) {
                    this.menuColor = true;
                } else {
                    this.menuColor = false;
                }
                if (newScrollTop <= 400) {
                    wrap.style.top = "-" + newScrollTop / 5 + "px";
                } else {
                    wrap.style.top = "-80px";
                }
            }
            this.scrollTop = newScrollTop;
        },
    },
});

app.mount("#layout");
