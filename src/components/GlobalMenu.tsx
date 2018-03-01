import * as React from 'react';
import styles from './../extensions/itaMegaMenu/AppCustomizer.module.scss';
export interface GlobalMenuProps {
}
import {INavigation, INavigationItem} from "./../interfaces";
import TopLevelMenu from './TopLevelMenu';

export default class GlobalMenu extends React.Component<GlobalMenuProps, any> {
   navigationItems:INavigation
    constructor(props)
  {
    super(props);
    this.navigationItems = require ('./../data/mockTaxonomy.json');
  }
  render() {
    console.log("Navigation Items ",this.navigationItems);    
    return (<div className={`ms-bgColor-themeDark ${styles.globalmenu}`}>      
          <TopLevelMenu items={this.navigationItems.navigation} />
      </div>
    );
  }  
}
