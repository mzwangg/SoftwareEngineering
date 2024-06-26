import { shallowMount } from '@vue/test-utils';
import HeaderComponent from '@/components/HeaderComponent.vue';

describe('HeaderComponent', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HeaderComponent, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
