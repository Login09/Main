import {$} from "../dom";
import {ActiveRoute} from "./ActiveRoute";

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router');
        }
       this.$placeholder = $(selector);
       this.routes = routes;
       this.page = null;
       this.changePageHandler = this.changePageHandler.bind(this);
       this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler);//отслеживание элементов по хэшу
        this.changePageHandler()
    }

    changePageHandler() {
      if (this.page) {
          this.page.destroy()
      }
      this.$placeholder.clear();
      const Page = ActiveRoute.path.includes('excel')
          ? this.routes.excel
          : this.routes.dashboard
      this.page = new Page(ActiveRoute.param[1]);
      this.$placeholder.append(this.page.getRoot());
      this.page.afterRender();
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler);
    }
}