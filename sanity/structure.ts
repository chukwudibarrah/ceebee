import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('comment').title('Comments'),
      S.documentTypeListItem('journal').title('Journals'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('user').title('Users'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['comment', 'journal', 'project', 'user'].includes(item.getId()!),
      ),
    ])
