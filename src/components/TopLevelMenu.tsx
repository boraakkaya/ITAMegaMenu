import * as React from 'react';
import { autobind } from '@uifabric/utilities';
import styles from './../extensions/itaMegaMenu/AppCustomizer.module.scss';
import {INavigation,INavigationItem,IStaticLinks} from './../interfaces';
import FlyOutDiv from './FlyOutDiv';
export interface TopLevelMenuProps {
    items:INavigationItem[],
    statics:IStaticLinks[]
}
export interface TopLevelMenuState
{
  selectedTopLevelItem:INavigationItem;
  selectedTopLevelStaticLinks: IStaticLinks
}

export default class TopLevelMenu extends React.Component<TopLevelMenuProps, TopLevelMenuState> {
  _children:INavigationItem[]
  _staticChildren : IStaticLinks[]
  _heading:string
  constructor(props)
  {
    super(props);
    this.state={selectedTopLevelItem:undefined, selectedTopLevelStaticLinks:undefined};
    this._children = undefined;
    this._staticChildren = undefined;
    this._heading = undefined;
  }
  render() {
    var that = this;
    return (
      <div>
        {this.props.items.map((item,index)=>{
          return <div className={styles.toplevelmenuitem} onMouseMove={()=>{this.handleMouseOver(item)}} onMouseOver={()=>{this.handleMouseOver(item)}} onMouseOut={()=>{this.handleMouseOut}}>
            <a href={item.link} onMouseOver={()=>{this.handleMouseOver(item)}} onMouseOut={()=>{this.handleMouseOut}}>{item.title}</a>
          </div>
        })}      
       {that._children && <div className={styles.flyoutwrapper} style={{height:(window.innerHeight-110)+"px"}}>
       <FlyOutDiv items={that._children} staticChildren={that._staticChildren} heading={that._heading} />
       </div>}
      </div>
    );
  }
  @autobind
  handleMouseOver(item:INavigationItem)
  {    
    this.setState({selectedTopLevelItem:item},()=>{
      this._children = item.children;
      this._heading = item.title;
      this.props.statics.filter((obj,index)=>{
        return obj.owner == item.title
      }).length > 0 ? this._staticChildren = this.props.statics.filter((obj,index)=>{
        return obj.owner == item.title
      }) :  this._staticChildren = undefined
    })
  }
  @autobind
  handleMouseOut()
  {    
    this.setState({selectedTopLevelItem:undefined},()=>{
      this._children = undefined;
      this._heading = undefined;
    });
  }
}
