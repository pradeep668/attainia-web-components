/* eslint max-len: "off" */
import React, {Component} from 'react'
import styled from 'styled-components'
import './index.css';
import cube from'../../images/cue.JPG';
import style from 'react-tooltip/dist/style';

const Accordin = styled.section`
    width: 100%;
    height: 100%;
`

const Assignment = styled.section`
    width: 100%;
    height: 100%;

    @supports(display: grid) {
        display: grid;
        grid-template-rows: 5em 10em 300px;
        grid-template-columns: 960px;
        justify-content: center;
        justify-items: center;
        grid-row-gap: 2em;
        align-items: center;
    }
`
const Instructions = styled.article`
    @supports(display: grid) {
        display: grid;
        grid-row-gap: 1em;
    }
`
const Mockup = styled.img`
    width: 960px;
`
const Header = styled.header`
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
    width: 850px;
    background: #a3b7bd;
    padding: 16px;
`

const Section = styled.section`
    height: 300px;
    width: 850px;
    background: #eef0f5;
    padding: 16px;
`
const Content = styled.div`
    height:100%;
    background:#e8eae5;
`

const Col25 = styled.div`
    width:24%;
    padding:.5%;
    display:inline-block;

`
class Homework extends Component {

    constructor(props){
        super(props);
        this.state = {
            "accordion1": true,
            "accordion2": false
        }
        this.toggleAccordion = this.toggleAccordion.bind(this);
    }

    toggleAccordion(name){
       // alert(this.state[name]);
        let obj = this.state;
        obj[name] = !this.state[name];
        this.setState(obj);
    }

    render(){
        return (<Accordin>
            <div>
                <Header onClick={()=> this.toggleAccordion('accordion1')}>Accordion 1</Header>
                { this.state.accordion1 && <Section>
                    <Content>
                        <Col25>
                            <h4>Dimensions</h4>
                            <img  src={cube} style={{width: "190px"}}/>
                        </Col25>
                        <Col25>
                            <h4>Header 1</h4>
                            <table>
                                <tbody>
                                    <tr><td>Left = 4 in</td></tr>
                                    <tr><td>Back = 2.125 in</td></tr>
                                    <tr><td>Right = 4 in</td></tr>
                                    <tr><td>Back = 2.125 in</td></tr>
                                    <tr><td>Right = 4 in</td></tr>
                                    <tr><td>Back = 2.125 in</td></tr>
                                </tbody>
                            </table>    
                        </Col25>
                        <Col25>
                            <h4>Header 2</h4>
                            <table>
                                <tbody>
                                    <tr><td>Back = 2.125 in</td></tr>
                                    <tr><td>Right = 4 in</td></tr>
                                    <tr><td>Back = 2.125 in</td></tr>
                                    <tr><td>Right = 4 in</td></tr>
                                    <tr><td>Back = 2.125 in</td></tr>
                                </tbody>
                            </table>  
                        </Col25>
                        <Col25>
                            <h4>Header 1</h4>
                            <table>
                                <tbody>
                                    <tr><td>Back = 2.125 in</td></tr>
                                    <tr><td>Right = 4 in</td></tr>
                                    <tr><td>Back = 2.125 in</td></tr>
                                </tbody>
                            </table>  
                        </Col25>
                    </Content>
                </Section>}
            </div>
    
            <div>
                <Header onClick={()=> this.toggleAccordion('accordion2')}>Accordion 2</Header>
                { this.state.accordion2 && <Section>
                    <Content></Content>
                </Section>}
            </div>
        </Accordin>);
    }
}


export default Homework;