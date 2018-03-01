import * as React from 'react';
import { autobind } from '@uifabric/utilities';
import styles from './../extensions/itaMegaMenu/AppCustomizer.module.scss';
import {INavigation,INavigationItem} from './../interfaces';
import FlyOutDiv from './FlyOutDiv';
export interface TopLevelMenuProps {
    items:INavigationItem[]
}
export interface TopLevelMenuState
{
  selectedTopLevelItem:INavigationItem;
}

export default class TopLevelMenu extends React.Component<TopLevelMenuProps, TopLevelMenuState> {
  _children:INavigationItem[]
  constructor(props)
  {
    super(props);
    this.state={selectedTopLevelItem:undefined};
    this._children = undefined;
  }
  render() {
    var that = this;
    return (
      <div>
        {this.props.items.map((item,index)=>{
          return <div className={styles.toplevelmenuitem} onMouseOver={()=>{this.handleMouseOver(item)}} onMouseOut={()=>{this.handleMouseOut}}>
            <a href={item.link} onMouseOver={()=>{this.handleMouseOver(item)}} onMouseOut={()=>{this.handleMouseOut}}>{item.title}</a>
          </div>
        })}      
       {that._children &&  <FlyOutDiv items={that._children} />}
      </div>
    );
  }
  @autobind
  handleMouseOver(item:INavigationItem)
  {
    console.log("On Mouse Over");
    this.setState({selectedTopLevelItem:item},()=>{
      this._children = item.children;
    })
  }
  @autobind
  handleMouseOut()
  {
    console.log("On Mouse Out");
    this.setState({selectedTopLevelItem:undefined},()=>{
      this._children = undefined;
    });
  }
}
