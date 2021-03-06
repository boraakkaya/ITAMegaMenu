import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'ItaMegaMenuApplicationCustomizerStrings';
import styles from './AppCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
const LOG_SOURCE: string = 'ItaMegaMenuApplicationCustomizer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GlobalMenu from './../../components/GlobalMenu'; 
import { INavigation } from '../../interfaces';
import {HttpClient} from '@microsoft/sp-http';
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */ 
export interface IItaMegaMenuApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Bottom: string;
  NavigationItems : INavigation | {}
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class ItaMegaMenuApplicationCustomizer
  extends BaseApplicationCustomizer<IItaMegaMenuApplicationCustomizerProperties> {
    
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;
  @override
  public onInit(): Promise<void> {
    this.properties.Bottom = "Bottom Property";
    this.properties.Top = "Top Property";
    this.getNavigationItems().then((items)=>{
      console.log("Returned Promise Result",items);
      this.properties.NavigationItems = items;
      Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
      // Added to handle possible changes on the existence of placeholders.
      this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
      // Call render method for generating the HTML elements.
      this._renderPlaceHolders();
      


    }).catch((err)=>{
      console.log("Error on Promise ", err);

    });
    return Promise.resolve<void>();
  }

  async getNavigationItems():Promise<INavigation | {}>
  {
    let navigationItems={}

    await this.context.httpClient.get("https://itauserprofilemanager.azurewebsites.net/api/GetNavigation",HttpClient.configurations.v1,{}).then(async(response)=>{
      await response.json().then((result)=>{
        console.log("Nav Data : ", result);
        navigationItems = result;
      }).catch((err)=>{
        console.log("Error on Promise Call ", err);
  
      });
    })    
    return navigationItems;
  }

  private _renderPlaceHolders(): void {

    console.log('HelloWorldApplicationCustomizer._renderPlaceHolders()');
    console.log('Available placeholders: ',
      this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));
 
    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = 
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose });
  
      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error('The expected placeholder (Top) was not found.');   
        return;  
      }
      if (this.properties) {
        let topString: string = this.properties.Top; 
        if (!topString) {
          topString = '(Top property was not defined.)';
        }  
        if (this._topPlaceholder.domElement) {
        //  this._topPlaceholder.domElement.innerHTML = `
        //<div class="${styles.app}">
        //  <div class="ms-bgColor-themeDark ms-fontColor-white ${styles.top}">
        //    <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(topString)}
        //  </div>
        //</div>`; 
        console.log("Rendering...");
        ReactDOM.render(<GlobalMenu navigationItems={this.properties.NavigationItems} />,this._topPlaceholder.domElement);   
        }
      }
    }
    // Handling the bottom placeholder  
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose });

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error('The expected placeholder (Bottom) was not found.');
        return;
      }

      if (this.properties) {
        let bottomString: string = this.properties.Bottom;
        if (!bottomString) {
          bottomString = '(Bottom property was not defined.)';
        }
        if (this._bottomPlaceholder.domElement) {
          this._bottomPlaceholder.domElement.innerHTML = `
        <div class="${styles.app}">
          <div class="ms-bgColor-themeDark ms-fontColor-white ${styles.bottom}">
            International Trade Administration
          </div>
        </div>`;
        }
      }
    }
  }
  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
