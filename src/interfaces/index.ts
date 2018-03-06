export interface INavigation
{
    navigation:INavigationItem[];
    staticLinks:IStaticLinks[];
}
export interface INavigationItem
{
    title:string;
    link:string;
    description:string;
    target:string;
    visible:boolean;
    children?:INavigationItem[];
}
export interface IStaticLinkHeading
{
    title:string;
    links:INavigationItem[];
}
export interface IStaticLinks
{
    owner:string;
    headings:IStaticLinkHeading[];

}