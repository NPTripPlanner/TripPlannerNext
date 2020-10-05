import React from 'react';
import { shallow} from 'enzyme';

import MulticolorText from '../../components/units/multicolor.text/multicolor.text.comp'

describe('MulticolorText component', ()=>{
    it('render text without error', async ()=>{
        const wrapper = shallow(<MulticolorText text='Test' />);
        return expect(wrapper.text()).toEqual('Test');
    })

    it('render prefix without error', async ()=>{
        const wrapper = shallow(<MulticolorText prefix='This is ' text='test'/>);
        return expect(wrapper.text()).toEqual('This is test');
    })

    it('render suffix without error', async ()=>{
        const wrapper = shallow(<MulticolorText text='test' suffix=' is fine'/>);
        return expect(wrapper.text()).toEqual('test is fine');
    })

    it('render full text without error', async ()=>{
        const wrapper = shallow(<MulticolorText prefix='This ' text='test' suffix=' is fine'/>);
        return expect(wrapper.text()).toEqual('This test is fine');
    })
})