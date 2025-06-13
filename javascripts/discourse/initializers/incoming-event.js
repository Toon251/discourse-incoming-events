import { apiInitializer } from 'discourse/lib/api';
import IncomingEvent from '../components/incoming-event';

export default apiInitializer('1.14.0', (api) => {

    

    
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    

    if(isMobile){
        console.log("Render in mobile ", settings.plugin_outlet_mobile.trim())
        api.renderInOutlet(settings.plugin_outlet_mobile.trim(), IncomingEvent);
    }else{
        console.log("Render in desktop ", settings.plugin_outlet.trim())
        api.renderInOutlet(settings.plugin_outlet.trim(), IncomingEvent);
    }

    //api.renderInOutlet(settings.plugin_outlet.trim(), IncomingEvent);
    //api.decorateWidget("post-contents:after", () => IncomingEvent);
});