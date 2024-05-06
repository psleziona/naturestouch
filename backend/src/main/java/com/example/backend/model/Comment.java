package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idComment;
    private String comment;
    private Integer rate;
    private LocalDateTime dateTime;
    @ManyToOne
    @JoinColumn(name = "id_product")
    @JsonIgnore
    private Product product;
}
