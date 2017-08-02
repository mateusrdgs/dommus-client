import { DommusClientPage } from './app.po';

describe('dommus-client App', () => {
  let page: DommusClientPage;

  beforeEach(() => {
    page = new DommusClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
