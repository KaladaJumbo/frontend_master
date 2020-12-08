import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils"
import jsdom from "mocha-jsdom"

//import all chai files needed here
import { expect } from "chai"

//import all files used in test here (should be only one file)
import About from "../src/components/about"
import { sum } from "../src/components/about"
 

//this creates a fake dom to allow testing of jsx (components)
global.document = jsdom({
    url: "http://localhost:3000"
})


//runs before and after a test is launched

//makes a div to allow mounting and unmounting of components easy 
//and without the need of a className

let fakeDiv;

beforeEach(() => {
  fakeDiv = document.createElement("div");
  document.body.appendChild(fakeDiv);
});

afterEach(() => {
  document.body.removeChild(fakeDiv);
  fakeDiv = null;
});

describe('testing about file', () => {
    it('expects 2+2 to equal 4', () => {
        expect(sum(2,2)).to.equal(4)
    });

    it('testing if about renders text to dom', () => {
        //act does the same thing as a component did mount or DomContentLoaded
        act(() => {
            //first element is what you want to add to the second element => fakeDiv.append(<about/>)
            ReactDOM.render(<About />, fakeDiv);
        });

        const h1 = fakeDiv.querySelector("h1");
        expect(h1.textContent).to.equal("About");
    });
});

//full unit test of about component
