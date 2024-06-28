import { toastQueue } from '~/components/toast-provider';
import Toast from '~/components/toast';

function addToast(args: React.ComponentProps<typeof Toast>) {
  const { content, title, type } = args;

  return toastQueue.add(<Toast title={title} content={content} type={type} />, { timeout: 3000 });
}

export default addToast;
