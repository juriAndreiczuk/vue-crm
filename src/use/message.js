export const useMessage = (html, type = '') => {
  if(type === 'error') {
    M.toast({html: `[ERROR]: ${html}`})
  } else {
    M.toast({html})
  }
}
