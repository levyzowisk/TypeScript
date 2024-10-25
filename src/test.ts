import { extend } from "joi";

interface htmlElement {
    a:HTMLAnchorElement;
    input:HTMLInputElement
    div:HTMLDivElement
}


const selecionar = <key extends keyof htmlElement>(selector:key) => {

}                                                                                        