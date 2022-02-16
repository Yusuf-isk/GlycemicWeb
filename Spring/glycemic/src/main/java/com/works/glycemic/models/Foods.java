package com.works.glycemic.models;

import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class Foods extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gid", nullable = false)
    private Long gid;

    private Integer cid;
    @Column(unique = true)
    private String name;
    private Integer glycemicindex;
    @Column(length = 100000)
    private String image;
    private String source;
    private boolean enabled;
    private String detail;
    private String url;
    private String category;
    private Integer amount=1;
}
