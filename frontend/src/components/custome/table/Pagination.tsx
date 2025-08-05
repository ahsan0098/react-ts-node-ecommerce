
interface Page { link: string, url: string, label: string, active: boolean }

interface Pagination { links: Page[], callback: CallableFunction }

const Pagination = ({ links, callback }: Pagination) => {
  return (
    <div className='flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
      {links.map((link: Page, index: number) => (
        <button
          key={index}
          className={`px-3 inline-flex items-center text-xs font-medium hover:text-blue-600  dark:hover:text-white ${link.active ? 'font-bold text-blue-500' : 'text-gray-700 dark:text-gray-400'} ${link.url ? '' : 'hidden'}`}
          onClick={() => callback(link.url)}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  )
}

export default Pagination