import * as React from 'react';
import {INavigation,INavigationItem} from './../interfaces';
import styles from '../extensions/itaMegaMenu/AppCustomizer.module.scss';
import NavigationSectionBox from "./NavigationSectionBox";
export interface FlyOutDivProps {
    items:INavigationItem[]
}
export interface FlyOutDivState
{

}
export default class FlyOutDiv extends React.Component<FlyOutDivProps, FlyOutDivState> {
  render() {
    return (
      <div className={`${styles.flyoutdiv} ms-bgColor-themeDark`}>           
           <NavigationSectionBox items={this.props.items} />           
      </div>
    );
  }
}
