const mapBannerResponse = (banner) => ({
  id: banner.id,
  description: banner.description,
  timer: banner.timer,
  link: banner.link,
  visible: banner.visible,
  visibleDateTime: banner.visible_datetime,
});

const responseMapper = (req, res, next) => {
  if (req.method === 'GET') {
    res.mapResponse = (data) => {
      if (Array.isArray(data)) {
        return data.map(mapBannerResponse);
      }
      return mapBannerResponse(data);
    };
  } else {
    res.mapResponse = (data) => data;
  }
  next();
};

export default responseMapper;
