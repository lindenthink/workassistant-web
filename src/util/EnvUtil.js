export default class EnvUtil {
    static getServiceUrl() {
        if (EnvUtil.isDev()) {
            return 'http://localhost:8080/workassistant'
        } else {
            return 'http://47.104.243.84:8080/workassistant'
        }
    }

    static isDev() {
        return window.location.href.toLocaleLowerCase().indexOf('://localhost:') !== -1
    }

}
