class locationFilter {
  url: string

  protected zhPathJSON = require('./languages/zh.json')
  protected englishPathJSON = require('./languages/english.json')

  constructor(url: string) {
    this.url = url
  }

  public getLanguageFromURL(): string {
    return this.url.substring(this.url.lastIndexOf('/') + 1)
  }

  public getDomainFromURL(): string {
    let domain: string
    if (this.url.includes('noah')) {
      domain = 'noah'
    } else if (this.url.includes('zoey')) {
      domain = 'zoey'
    } else {
      throw new Error('Not Found Domain from URL')
    }
    return domain
  }

  private loadLanguageJSON() {
    const languageTag: string = this.getLanguageFromURL()
    let json
    switch (languageTag.toUpperCase()) {
      case 'EN':
        json = this.englishPathJSON
        break
      case 'ZH':
        json = this.zhPathJSON
        break
    }
    return json
  }

  getLanguageObject() {
    return this.loadLanguageJSON()
  }
}

export default locationFilter
