'use client';

import Input from '~/components/input';
import Button from '~/components/button';
import uploadFile from '~/utils/upload-file';
import { ChangeEvent, useState } from 'react';
import NProgress from '~/components/nprogress';
import { cn } from '~/utils/cn';
import { Icon } from '@iconify/react';

type Args = {
  getCancel: (cancel: () => void) => void;
  file: File;
  name: string;
  onProgress: (progress: number) => void;
  type: 'media' | 'resource';
};

const ImportVideo = (props) => {

  const uploadInputFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const args: Args = {
      file: file,
      name: file.name,
      type: 'media',
      onProgress: (progress: number) => console.log(progress),
      getCancel: (cancel: () => void) => { }
    };


    uploadFile(args).then((publicUrl) => console.log(publicUrl))
      .catch((error) => console.error(error))
  }

  return (
    <Button
      onClick={() => (document.querySelector('#input-file') as HTMLInputElement).click()}
    >
      <Input type='file' id='input-file' onChange={uploadInputFile} accept="video/mp4"
        className='hidden' />
      <Icon icon='rivet-icons:upload' />
    </Button>
  )
}

export default ImportVideo;
