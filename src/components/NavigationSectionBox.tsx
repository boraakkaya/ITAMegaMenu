import * as React from 'react';
import { INavigation, INavigationItem } from './../interfaces';
import styles from '../extensions/itaMegaMenu/AppCustomizer.module.scss';
import { autobind } from '@uifabric/utilities';
export interface NavigationSectionBoxProps {
    items: INavigationItem[]
}
export interface NavigationSectionBoxState {
    selectedNavigationItem: INavigationItem;
}
export default class NavigationSectionBox extends React.Component<NavigationSectionBoxProps, NavigationSectionBoxState> {
    _children:INavigationItem[];
    constructor(props) {
        super(props);
        this.state = { selectedNavigationItem: undefined };
        this._children = undefined;
    }
    componentWillReceiveProps(prevProps)
    {
        this.setState({ selectedNavigationItem: undefined },()=>{
            this._children = undefined;
        });
    }
    render() {
        var that = this;
        return (
            <div>
            <div className={`${styles.navigationsectionbox}`}>
                {this.props.items.map((item: INavigationItem, index) => {
                    return <div onMouseOver={() => { this.handleMouseOver(item) }} onMouseMove={() => { this.handleMouseOver(item) }} onMouseOut={() => { this.handleMouseOut }}><a href={item.link} onMouseOver={()=>{this.handleMouseOver(item)}} onMouseOut={()=>{this.handleMouseOut}}>{item.title}</a></div>
                })}                
            </div>            
            {that._children && <NavigationSectionBox items={that._children} />}
        </div>
        );
    }
    @autobind
    handleMouseOver(item:INavigationItem) {
        console.log("On Mouse Over");
        this.setState({ selectedNavigationItem: item },()=>{
            this._children = item.children ? item.children : undefined;
        })
    }
    @autobind
    handleMouseOut() {
        console.log("On Mouse Out");
        this.setState({ selectedNavigationItem: undefined },()=>{
            this._children = undefined;
        });
    }
}
