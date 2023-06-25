package recipes.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import recipes.repository.FileRepositoryImplementation;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class FileServiceImplementation  {
    @Autowired
    private FileRepositoryImplementation fileRepositoryImplementation;

    //EXIST
    public boolean exists(String id) {
        boolean output = fileRepositoryImplementation.exists(id);
        return output;
    }

    //DOWNLOAD
    public File downloadById(String referenceId) {
        File file = fileRepositoryImplementation.downloadById(referenceId);
        return file;
    }



    public String save(InputStream inputStream, String fileName, String contentType) {

        String output = fileRepositoryImplementation.saveFile(inputStream, fileName, contentType);
        return output;
    }


    public boolean deleteById(String referenceId) {
        fileRepositoryImplementation.deleteById(referenceId);
        boolean deleted = !fileRepositoryImplementation.exists(referenceId);
        return deleted;
    }


    public boolean deleteByIdList(List<String> idList) {
        fileRepositoryImplementation.delete(idList);
        boolean deleted = true;
        for (String id : idList) {
            if (fileRepositoryImplementation.exists(id)) {
                deleted = false;
                break;
            }
        }
        return deleted;
    }


    public List<File> downloadAll(List<String> idList) {
        List<File> resourceList = new ArrayList<>();
        idList.forEach(id -> {
            if (id != null) {
                File file = fileRepositoryImplementation.downloadFileById(id);
                if (file != null) {
                    resourceList.add(file);
                }
            }
        });
        return resourceList;
    }


    public boolean existsByName(String filename) {

        boolean output = fileRepositoryImplementation.existsByName(filename);

        return output;
    }


    public Resource downloadByName(String filename) {

        Resource resource = fileRepositoryImplementation.downloadByName(filename);

        return resource;
    }


    public void deleteByName(String filename) {

        fileRepositoryImplementation.deleteByName(filename);

    }
}