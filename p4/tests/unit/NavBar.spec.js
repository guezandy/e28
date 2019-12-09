import {
  expect
} from 'chai'

import {
  mount,
  RouterLinkStub
} from '@vue/test-utils'

import NavBar from '@/components/NavBar.vue'

describe('ShowProduct.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(NavBar, {
      computed: {
        student: function () {
          return {
            "id": 1,
            "name": "Andrew Rodriguez",
            "completedCourses": [{
                "id": "CSCI E-15",
                "grade": "A",
                "semeseter": "Fall 2018"
              },
              {
                "id": "CSCI E-124",
                "grade": "B",
                "semeseter": "Spring 2019"
              },
              {
                "id": "CSCI E-33A",
                "grade": "A-",
                "semeseter": "Summer 2019"
              },
              {
                "id": "CSCI E-3",
                "grade": "A",
                "semeseter": "Summer 2019"
              },
              {
                "id": "CSCI E-91",
                "grade": "B",
                "semeseter": "Fall 2019"
              },
              {
                "id": "DGMD E-28",
                "grade": "A",
                "semeseter": "Fall 2019"
              }
            ]
          }
        }
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    // All 3 navbar links
    expect(wrapper.text()).to.include('Degree Audit');
    expect(wrapper.text()).to.include('Certificate Program');
    expect(wrapper.text()).to.include('Masters Programs');
  });
});