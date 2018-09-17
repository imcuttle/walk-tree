/**
 * Enhanced and multifunctional tree walker
 * @author imcuttle
 */
import { Context } from 'tree-crawl'

interface IContext extends Context {
  track?: Map
}

interface IOptions {
  path?: string
  order?: 'pre' | 'post' | 'bfs'
  skipVisited?: boolean
  uniquePath?: Function | string | null
  state?: any
}

declare type walkTree<T extends Object> = (
  tree: T,
  walker?: (node: any, ctx: IContext) => void,
  options?: IOptions
) => T

export = walkTree
