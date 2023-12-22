import path from 'path';
import type StateBlock from 'markdown-it/lib/rules_block/state_block';

/**
 * Build token by examples
 *
 * @param state
 * @param startLine
 * @param endLine
 * @param silent
 */
export function exampleParser(state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean {
  const CH = '<'.charCodeAt(0)
  const pos = state.bMarks[startLine] + state.tShift[startLine]
  const max = state.eMarks[startLine]

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false
  }

  // ignore all lines not starts with <<<
  for (let i = 0; i < 3; ++i) {
    const ch = state.src.charCodeAt(pos + i)
    if (ch !== CH || pos + i >= max) return false
  }

  // ignore if the line is not [examples]
  const line = state.src.slice(pos, max)

  if (!line.includes('[examples]')) {
    return false
  }

  if (silent) {
    return true
  }

  const start = pos + 3
  const end = state.skipSpacesBack(max, pos)

  const rawPath = state.src
    .slice(start, end)
    .trim()

  const { filepath, extension, region, lines, lang, title } =
    rawPathToToken(rawPath)

  state.line = startLine + 1

  // Build token by examples
  const { examples } = state.env.frontmatter??{};

  if (examples && examples.length) {
    examples.forEach((example, index) => {
      const token = state.push('fence', 'code', 0)
      token.info = `vue[${example.fileName}]`

      const { realPath, path: _path } = state.env
      const resolvedPath = path.resolve(path.dirname(realPath ?? _path), example.fileName)

      // @ts-ignore
      token.src = [resolvedPath, region.slice(1)]
      token.markup = '```'
      token.map = [startLine, startLine + 1]
      token.meta = `example-${index}`
    });
  }

  return true;
}

/**
 * raw path format: "/path/to/file.extension#region {meta} [title]"
 *    where #region, {meta} and [title] are optional
 *    meta can be like '1,2,4-6 lang', 'lang' or '1,2,4-6'
 *    lang can contain special characters like C++, C#, F#, etc.
 *    path can be relative to the current file or absolute
 *    file extension is optional
 *    path can contain spaces and dots
 *
 * captures: ['/path/to/file.extension', 'extension', '#region', '{meta}', '[title]']
 */
export const rawPathRegexp =
  /^(.+?(?:(?:\.([a-z0-9]+))?))(?:(#[\w-]+))?(?: ?(?:{(\d+(?:[,-]\d+)*)? ?(\S+)?}))? ?(?:\[(.+)\])?$/

export function rawPathToToken(rawPath: string) {
  const [
    filepath = '',
    extension = '',
    region = '',
    lines = '',
    lang = '',
    rawTitle = ''
  ] = (rawPathRegexp.exec(rawPath) || []).slice(1)

  const title = rawTitle || filepath.split('/').pop() || ''

  return { filepath, extension, region, lines, lang, title }
}
