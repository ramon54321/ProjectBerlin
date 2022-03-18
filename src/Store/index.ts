import { Store } from './Thorium'
import Loki from 'lokijs'
import { Token } from '../Logic/Token'

export const store = new Store()

export const database = new Loki("mydb")
database.addCollection<Token>("tokens")
