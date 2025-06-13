import { apiInitializer } from 'discourse/lib/api';
import IncomingEvent from '../components/incoming-event';

export default apiInitializer('1.14.0', (api) => {

    function isMobile () {
        return window.matchMedia("(max-width: 767px)").matches;
    }

    
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    console.log(isMobile);

    if(isMobile){
        console.log("Renden in mobil ", settings.plugin_outlet_mobile.trim())
        api.renderInOutlet(settings.plugin_outlet_mobile.trim(), IncomingEvent);
    }else{
        console.log("Renden in desktop ", settings.plugin_outlet.trim())
        api.renderInOutlet(settings.plugin_outlet.trim(), IncomingEvent);
    }

    //api.renderInOutlet(settings.plugin_outlet.trim(), IncomingEvent);
    //api.decorateWidget("post-contents:after", () => IncomingEvent);
});