import Component from "@glimmer/component";
import { computed, action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from "@glimmer/tracking";

export default class IncomingEvent extends Component {
    @tracked incomingEvents = [];

    @computed
    get isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }
  
    constructor() {
        super(...arguments);
        this.loadEvents(); 
        
    }


    async loadEvents() {
        try {

        
          // Get
          const resp = await fetch(settings.url, 
            { 
              method: "GET",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              } }
          );
          this.incomingEvents = await resp.json();

          console.log('Third fetch result:', data3);
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
}