import { apiInitializer } from 'discourse/lib/api';
import IncomingEvent from '../components/incoming-event';

export default apiInitializer('1.14.0', (api) => {
    api.renderInOutlet(settings.plugin_outlet.trim(), IncomingEvent);
    //api.decorateWidget("post-contents:after", () => IncomingEvent);
});