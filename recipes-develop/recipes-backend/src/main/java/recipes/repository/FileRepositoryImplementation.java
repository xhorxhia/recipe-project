package recipes.repository;

import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Repository;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Repository
@Slf4j
public class FileRepositoryImplementation{
    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private GridFSBucket gridFSBucket;


    public boolean exists(String id) {

        boolean output = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(new ObjectId(id)))) != null;

        return output;
    }


    public File downloadById(String referenceId) {

        GridFSFile gridFSFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(new ObjectId(referenceId))));
        File file = null;
        if (gridFSFile != null) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(gridFSFile.getFilename())) {
                gridFSBucket.downloadToStream(gridFSFile.getObjectId(), fileOutputStream);
            } catch (IOException e) {
                e.printStackTrace();
            }
            file = new File(gridFSFile.getFilename());
        }

        return file;
    }


    public String saveFile(InputStream inputStream, String fileName, String contentType) {

        String output = null;
        try {
            output = gridFsTemplate.store(inputStream, fileName, contentType).toHexString();
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return output;
    }


    public File downloadFileById(String referenceId) {

        File file = null;
        try {
            GridFSFile gridFSFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(new ObjectId(referenceId))));
            if (gridFSFile != null) {
                try (FileOutputStream fileOutputStream = new FileOutputStream(gridFSFile.getFilename())) {
                    gridFSBucket.downloadToStream(gridFSFile.getObjectId(), fileOutputStream);
                    file = new File(gridFSFile.getFilename());
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }

        return file;
    }


    public void deleteById(String referenceId) {

        gridFsTemplate.delete(new Query(Criteria.where("_id").is(new ObjectId(referenceId))));

    }



    public void delete(List<String> idList) {

        List<ObjectId> objectIdList = new ArrayList<>();
        idList.forEach(id -> objectIdList.add(new ObjectId(id)));
        Query query = new Query(Criteria.where("_id").in(objectIdList));
        gridFsTemplate.delete(query);

    }


    public boolean existsByName(String filename) {

        boolean output = gridFsTemplate.findOne(Query.query(Criteria.where("filename").is(filename))) != null;

        return output;
    }


    public Resource downloadByName(String filename) {

        InputStreamResource resource = null;
        GridFSFile gridFSFile = gridFsTemplate.findOne(new Query(Criteria.where("filename").is(filename)));
        if (gridFSFile != null) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(gridFSFile.getFilename())) {
                gridFSBucket.downloadToStream(gridFSFile.getObjectId(), fileOutputStream);
            } catch (IOException e) {
                e.printStackTrace();
            }
            File file = new File(gridFSFile.getFilename());
            try {
                resource = new InputStreamResource(new FileInputStream(file));
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
            if (!file.delete()) {
                file.deleteOnExit();
                log.error("Could not delete file. Delete on exit");
            }
        }

        return resource;
    }


    public void deleteByName(String filename) {

        Query query = new Query(Criteria.where("filename").is(filename));
        gridFsTemplate.delete(query);

    }
}