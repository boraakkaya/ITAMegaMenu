import * as React from 'react';
import {INavigation,INavigationItem, IStaticLinks} from './../interfaces';
import styles from '../extensions/itaMegaMenu/AppCustomizer.module.scss';
import NavigationSectionBox from "./NavigationSectionBox";
import { StaticSectionBox } from './StaticSectionBox';
export interface FlyOutDivProps {
    items:INavigationItem[];
    staticChildren:IStaticLinks | any;
    heading:string;
}
export interface FlyOutDivState{}
declare var navBoxWidth:number;
export default class FlyOutDiv extends React.Component<FlyOutDivProps, FlyOutDivState> {  
  public render() {    
    (window as any).navBoxWidth = (window.innerWidth -58) / 4;
    return (
      <div className={`${styles.flyoutdiv}`} onClick={(e)=>{console.log("YYYY");e.preventDefault(); e.stopPropagation();return false;}}>
            <div style={{position:"absolute",zIndex:1004,float:"left",border:"1px solid #cccc", backgroundColor:"#0392cf"}} onMouseLeave={()=>{this.setState(this.state);}}>
            <h3>{this.props.heading}</h3>           
           <NavigationSectionBox items={this.props.items} />
           </div>
          {this.props.staticChildren && <StaticSectionBox handleMouseEnter={(e)=>{this.setState(this.state);}} items={this.props.staticChildren} /> }
      </div>
    );
  }
}
