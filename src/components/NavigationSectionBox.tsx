import * as React from 'react';
import { INavigation, INavigationItem } from './../interfaces';
import styles from '../extensions/itaMegaMenu/AppCustomizer.module.scss';
import { autobind } from '@uifabric/utilities';
export interface NavigationSectionBoxProps {
    items: INavigationItem[];
}
export interface NavigationSectionBoxState {
    selectedNavigationItem: INavigationItem;
}
export default class NavigationSectionBox extends React.Component<NavigationSectionBoxProps, NavigationSectionBoxState> {
    private _children:INavigationItem[];
    constructor(props) {
        super(props);
        this.state = { selectedNavigationItem: undefined };
        this._children = undefined;
    }
    public componentWillReceiveProps(prevProps)
    {
        this.setState({ selectedNavigationItem: undefined },()=>{
            this._children = undefined;
        });
    }
    public render() {        
        var that = this;
        return (
            <div style={{position:"relative",zIndex:1002, float:"left"}}>
            <div className={`${styles.navigationsectionbox}`} style={{width:(window as any).navBoxWidth+"px"}}>
                {this.props.items.map((item: INavigationItem, index) => {
                    return <div onMouseOver={() => { this.handleMouseOver(item); }} onMouseMove={() => { this.handleMouseOver(item); }} onMouseOut={() => { this.handleMouseOut(); }}><a href={item.link} onMouseOver={()=>{this.handleMouseOver(item);}} onMouseOut={()=>{this.handleMouseOut();}}>{item.title}
                    {item.children ? <div>
                        <i className={`ms-Icon ms-Icon--TriangleSolid`} style={{transform:"rotate(90deg)",fontSize:"6px"}} />
                    </div> : ""}
                                       
                    </a></div>;
                })}                
            </div>            
            {that._children && <NavigationSectionBox items={that._children} />}
        </div>
        );
    }
    @autobind
    private handleMouseOver(item:INavigationItem) {        
        this.setState({ selectedNavigationItem: item },()=>{
            this._children = item.children ? item.children : undefined;
        });
    }
    @autobind
    private handleMouseOut() {        
        this.setState({ selectedNavigationItem: undefined },()=>{
            this._children = undefined;
        });
    }
}
