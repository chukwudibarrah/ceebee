import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {commentType} from './commentType'
import {journalType} from './journalType'
import {projectType} from './projectType'
import {userType} from './userType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, commentType, journalType, projectType, userType],
}
