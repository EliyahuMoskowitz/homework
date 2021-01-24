export interface BlogServerProps{
    id: number,
    name: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    }
}

export interface Blog{
  id: number,
  name: string,
  website: string,
  companyName: string,
  catchPhrase: string,
  bs: string
}
