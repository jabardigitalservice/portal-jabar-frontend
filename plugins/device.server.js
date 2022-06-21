import MobileDetect from 'mobile-detect'

export default ({ req, store }) => {
  const md = new MobileDetect(req.headers['user-agent'])
  const isMobile = md.phone() !== null || md.mobile() === 'UnknownMobile'
  const isTablet = md.tablet() !== null || md.mobile() === 'UnknownTablet'
  const isDesktop = !isMobile && !isTablet

  store.commit('device/setDevice', {
    isMobile,
    isTablet,
    isDesktop
  })
}
