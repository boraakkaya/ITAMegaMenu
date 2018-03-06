import * as React from 'react';
import { IStaticLinks, IStaticLinkHeading, INavigationItem } from '../interfaces';
import styles from '../extensions/itaMegaMenu/AppCustomizer.module.scss';
export interface StaticSectionProps {
    items:IStaticLinkHeading;
    index:number;
}
export interface StaticSectionState {}

export default class StaticSection extends React.Component<StaticSectionProps, StaticSectionState> {
    public render(): JSX.Element {
        var bgColor="#004578";
        switch (this.props.index)
        {
        case 0 : bgColor =  "#ee4035";
        break;
        case 1 : bgColor = "#f37736";
        break;
        case 2 : bgColor = "#7bc043";
        break;
        default : bgColor =  "ee4035";
        }

        return (<div className={styles.staticsection} style={{backgroundColor:bgColor, width:(window as any).navBoxWidth+"px"}}>
            <h3>{this.props.items.title}</h3>
            {this.props.items.title == "Teams" && <div style={{float:"right", width:"140px", margin:"8px" }}>
                <input type="text" placeholder="Search" style={{border:"none", borderBottomLeftRadius:"8px", borderBottomRightRadius:"8px", borderTopLeftRadius:"8px", borderTopRightRadius:"8px", textIndent:"10px" }}/>
            </div>}
            <div>
            {this.props.items.links.map((link,index)=>{
                return <div>
                    <a href={link.link}>{link.title}</a>
                </div>;
            })}            
            </div>
            {this.props.items.title == "Teams" && <div style={{position:"absolute", bottom:"5px", right:"0px", width:"65px", color:"#fff" }}>View All</div>}
        </div>);
    }
}
