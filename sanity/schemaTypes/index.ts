// /sanity/schemaTypes/index.ts

import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { commentType } from './commentType'
import { commentReportType } from './commentReportType'
import { journalType } from './journalType'
import { projectType } from './projectType'
import { userType } from './userType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType, 
    commentType, 
    commentReportType, 
    journalType, 
    projectType, 
    userType
  ],
}
