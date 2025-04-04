import FolderList from '@/features/folders/components/FolderList';
import { getFolders } from '@/features/folders/fetch/folder-fetch';
import { requiredUser } from '@/helpers/user-helper';

export default async function Home() {
  await requiredUser('/');
  const folders = await getFolders();

  return (
    <div className="w-[90%] mx-auto py-4">
      <FolderList folders={folders} isSubFolder={false} />
    </div>
  );
}
