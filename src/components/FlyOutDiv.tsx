import * as React from 'react';
import {INavigation,INavigationItem, IStaticLinks} from './../interfaces';
import styles from '../extensions/itaMegaMenu/AppCustomizer.module.scss';
import NavigationSectionBox from "./NavigationSectionBox";
import { StaticSectionBox } from './StaticSectionBox';
export interface FlyOutDivProps {
    items:INavigationItem[],
    staticChildren:IStaticLinks | any,
    heading:string
}
export interface FlyOutDivState
{

}
declare var navBoxWidth:number
export default class FlyOutDiv extends React.Component<FlyOutDivProps, FlyOutDivState> {  
  render() {
    
    (window as any).navBoxWidth = (window.innerWidth -58) / 4;
    return (
      <div className={`${styles.flyoutdiv}`}>
            <div style={{position:"absolute",zIndex:1002,float:"left",border:"1px solid #cccc", backgroundColor:"#0392cf"}}>
            <h3>{this.props.heading}</h3>           
           <NavigationSectionBox items={this.props.items} />
           </div>
          {this.props.staticChildren && <StaticSectionBox items={this.props.staticChildren} /> }
      </div>
    );
  }
}
