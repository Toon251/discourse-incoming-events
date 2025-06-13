import Component from "@glimmer/component";
import { computed, action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from "@glimmer/tracking";

export default class IncomingEvent extends Component {
    @tracked incomingEvents = [];
    @tracked title = "";

    @computed
    get isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }

    @computed
    get getOutlet() {
      return /Mobi|Android/i.test(navigator.userAgent) ? settings.plugin_outlet_mobile : settings.plugin_outlet;
    }
  
    constructor() {
        super(...arguments);
        this.loadEvents(); 
        
    }


    async loadEvents() {
        try {
        
          this.title = settings.title;
        
          // Get
          const resp = await fetch(settings.url, 
            { 
              method: "GET",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              } }
          );
          const respData = await resp.json();
          if(respData.success){
            this.incomingEvents = respData.data;
          }
          

          //console.log('Events:', this.incomingEvents);
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
}