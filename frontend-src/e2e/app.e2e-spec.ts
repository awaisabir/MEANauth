import { FrontendSrcPage } from './app.po';

describe('frontend-src App', function() {
  let page: FrontendSrcPage;

  beforeEach(() => {
    page = new FrontendSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
