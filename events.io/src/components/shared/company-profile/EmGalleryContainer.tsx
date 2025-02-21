import React, { useState } from 'react';

import { useGetEmployerGalleryImages } from '@/hooks/shared';
import { TGalleryPayload } from '@/@types/employer/employer';
import EmGallery from './EmGallery';
import EmGallerySkeleton from './skeletons/EmGallerySkeleton';

type Props = {
  employerId: string;
};

const EmGalleryContainer = ({ employerId }: Props) => {
  const [filterDTO, setFilterDTO] = useState<TGalleryPayload>({
    itemsPerPage: 9,
    organizationId: employerId,
    page: 1,
  });

  const { data: galleryData, isPending: loading } =
    useGetEmployerGalleryImages(filterDTO);

  return loading ? (
    <EmGallerySkeleton />
  ) : galleryData && galleryData.items.length ? (
    <EmGallery
      galleryData={galleryData}
      filterDTO={filterDTO}
      setFilterDTO={setFilterDTO}
    />
  ) : null;
};

export default EmGalleryContainer;
