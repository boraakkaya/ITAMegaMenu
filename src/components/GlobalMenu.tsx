import * as React from 'react';
import styles from './../extensions/itaMegaMenu/AppCustomizer.module.scss';
export interface GlobalMenuProps {
  navigationItems : INavigation | any
}
import {INavigation, INavigationItem} from "./../interfaces";
import TopLevelMenu from './TopLevelMenu';

export default class GlobalMenu extends React.Component<GlobalMenuProps, any> {
   //private navigationItems:INavigation;
    constructor(props)
  {
    super(props);
    //this.navigationItems = require ('./../data/mockTaxonomy.json');
  }
  public render() {
    return (<div className={`ms-bgColor-themeDark ${styles.globalmenu}`}>      
          <TopLevelMenu items={this.props.navigationItems.navigation} statics = {this.props.navigationItems.staticLinks}/>
      </div>
    );
  }  
}
